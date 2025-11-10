output "ec2_public_ip" {
  description = "Public IP of EC2"
  value       = aws_instance.backend_server.public_ip
}

output "rds_endpoint" {
  description = "MySQL Database endpoint"
  value       = aws_db_instance.mysql_db.endpoint
}
