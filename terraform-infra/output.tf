output "ec2_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.backend_server.public_ip
}

output "rds_endpoint" {
  description = "RDS MySQL endpoint"
  value       = aws_db_instance.mysql_db.endpoint
}

output "s3_website_url" {
  description = "S3 static website URL"
  value       = aws_s3_bucket_website_configuration.frontend_bucket_website.website_endpoint
}

output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.app_repo.repository_url
}
