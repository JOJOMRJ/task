-- 创建数据库
CREATE DATABASE IF NOT EXISTS task_crud
DEFAULT CHARACTER SET = 'utf8mb4';

-- 使用数据库
USE task_crud;

-- 创建 tasks 表
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  assignee VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);