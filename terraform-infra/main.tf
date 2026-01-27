provider "aws" {
  region = "ap-south-1"
}

resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "bodima-frontend"
}

resource "aws_s3_bucket_acl" "frontend_acl" {
  bucket = aws_s3_bucket.frontend_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "frontend_bucket_website" {
  bucket = aws_s3_bucket.frontend_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_ecr_repository" "app_repo" {
  name = "my-app-repo"
}

resource "aws_db_instance" "mysql_db" {
  identifier              = "bodima-mysql"
  engine                  = "mysql"
  engine_version          = "8.4.7"
  instance_class          = "db.t3.micro"

  allocated_storage       = 400
  max_allocated_storage   = 1000
  storage_encrypted       = true

  db_name                 = "bodima_db"
  username                = "admin"
  password                = "Admin200142"

  publicly_accessible     = true
  skip_final_snapshot     = true
}


resource "aws_instance" "backend_server" {
  ami           = "ami-0ff5003538b60d5ec"
  instance_type = "t3.micro"

  tags = {
    Name = "backend-server"
  }
}

resource "aws_security_group" "app_sg" {
  name        = "app-security-group"
  description = "Allow SSH, HTTP, and MySQL"
  vpc_id      = "vpc-0f91e7512ae68c508"

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
    description = "Allow MySQL"
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
