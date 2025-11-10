# --------------------------
# Security Group
# --------------------------
resource "aws_security_group" "app_sg" {
  name        = "app-security-group"
  description = "Allow SSH, HTTP, and MySQL"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow Spring Boot Port"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow MySQL Access"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "AppSecurityGroup"
  }
}

# --------------------------
# EC2 Instance
# --------------------------
data "aws_vpc" "default" {
  default = true
}

resource "aws_instance" "backend_server" {
  ami                    = "ami-0a0f1259dd1c90938"
  instance_type          = "t3.micro"
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  tags = {
    Name = "SpringBoot-Backend"
  }
}

# --------------------------
# RDS MySQL Database
# --------------------------
resource "aws_db_instance" "mysql_db" {
  identifier             = "bodima-mysql-db"
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "mysql"
  engine_version         = "8.0.42"   # <-- Use a valid version
  instance_class         = "db.t3.micro"
  username               = "admin"
  password               = "password12345"
  publicly_accessible    = true
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  tags = {
    Name = "Bodima-MySQL"
  }
}


