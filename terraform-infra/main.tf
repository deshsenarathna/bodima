# ECR repositories
resource "aws_ecr_repository" "backend" {
  name                 = "bodima-backend"
  image_tag_mutability = "MUTABLE"
  tags                 = var.tags
}

resource "aws_ecr_repository" "frontend" {
  name                 = "bodima-frontend"
  image_tag_mutability = "MUTABLE"
  tags                 = var.tags
}

# Security group for app
resource "aws_security_group" "app_sg" {
  name        = "bodima-app-sg"
  description = "Allow HTTP and backend ports"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Backend 9090"
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

# Use default VPC
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Latest Amazon Linux 2 AMI
data "aws_ami" "al2" {
  owners      = ["137112412989"] # Amazon
  most_recent = true
  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# EC2 instance
resource "aws_instance" "app" {
  ami                    = data.aws_ami.al2.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  subnet_id              = data.aws_subnets.default.ids[0]
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  tags = merge(var.tags, { name = "bodima-app" })

  lifecycle {
    ignore_changes = [ami]
  }
}

# RDS security group (allow MySQL from app_sg)
resource "aws_security_group" "rds_sg" {
  name        = "bodima-rds-sg"
  description = "Allow MySQL from app SG"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description              = "MySQL"
    from_port                = 3306
    to_port                  = 3306
    protocol                 = "tcp"
    security_groups          = [aws_security_group.app_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

# DB subnet group (use default VPC subnets)
resource "aws_db_subnet_group" "default" {
  name       = "bodima-db-subnet-group"
  subnet_ids = data.aws_subnets.default.ids
  tags       = var.tags
}

# RDS MySQL instance
resource "aws_db_instance" "mysql" {
  identifier              = "bodima-db"
  engine                  = "mysql"
  engine_version          = "8.0"
  instance_class          = var.db_instance_class
  allocated_storage       = 20
  db_name                 = var.db_name
  username                = var.db_username
  password                = var.db_password
  db_subnet_group_name    = aws_db_subnet_group.default.name
  vpc_security_group_ids  = [aws_security_group.rds_sg.id]
  skip_final_snapshot     = true
  publicly_accessible     = false

  # Multi-AZ disabled for cost in dev; enable for prod
  multi_az = false

  tags = var.tags
}

output "ec2_public_ip" {
  value = aws_instance.app.public_ip
}

output "ecr_backend_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "ecr_frontend_url" {
  value = aws_ecr_repository.frontend.repository_url
}

output "rds_endpoint" {
  value = aws_db_instance.mysql.endpoint
}
