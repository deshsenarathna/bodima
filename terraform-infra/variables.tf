variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "key_name" {
  description = "Existing AWS key pair name"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "tags" {
  description = "Common resource tags"
  type        = map(string)
  default     = {
    project = "bodima"
  }
}

variable "db_name" {
  description = "RDS database name"
  type        = string
  default     = "bodima"
}

variable "db_username" {
  description = "RDS master username"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "RDS master password"
  type        = string
  sensitive   = true
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}
