"""
Database Models
SQLAlchemy ORM models for DataWhere House
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    """User model"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    company = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    data_uploads = relationship("DataUpload", back_populates="user")
    queries = relationship("Query", back_populates="user")

class DataUpload(Base):
    """Data upload model"""
    __tablename__ = "data_uploads"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    file_name = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)
    rows = Column(Integer, nullable=False)
    columns = Column(JSON, nullable=False)
    status = Column(String, default="pending")  # pending, processing, completed, failed
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    processed_at = Column(DateTime, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="data_uploads")

class Query(Base):
    """Query history model"""
    __tablename__ = "queries"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    query_type = Column(String, nullable=False)  # analytics, ai_assistant
    query_text = Column(String, nullable=False)
    filters = Column(JSON, nullable=True)
    results = Column(JSON, nullable=True)
    execution_time_ms = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="queries")

class AnalyticsMetric(Base):
    """Analytics metrics model"""
    __tablename__ = "analytics_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    metric_name = Column(String, nullable=False)
    metric_value = Column(Float, nullable=False)
    metric_type = Column(String, nullable=False)  # revenue, growth, users, etc.
    date = Column(DateTime, nullable=False)
    metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# Example Star Schema Tables

class FactSales(Base):
    """Fact table for sales data"""
    __tablename__ = "fact_sales"
    
    id = Column(Integer, primary_key=True, index=True)
    date_key = Column(Integer, ForeignKey("dim_date.date_key"), nullable=False)
    product_key = Column(Integer, ForeignKey("dim_product.product_key"), nullable=False)
    region_key = Column(Integer, ForeignKey("dim_region.region_key"), nullable=False)
    customer_key = Column(Integer, ForeignKey("dim_customer.customer_key"), nullable=False)
    
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_amount = Column(Float, nullable=False)
    discount = Column(Float, default=0.0)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class DimDate(Base):
    """Dimension table for dates"""
    __tablename__ = "dim_date"
    
    date_key = Column(Integer, primary_key=True)
    full_date = Column(DateTime, nullable=False)
    day = Column(Integer, nullable=False)
    month = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)
    quarter = Column(Integer, nullable=False)
    day_name = Column(String, nullable=False)
    month_name = Column(String, nullable=False)

class DimProduct(Base):
    """Dimension table for products"""
    __tablename__ = "dim_product"
    
    product_key = Column(Integer, primary_key=True, index=True)
    product_id = Column(String, unique=True, nullable=False)
    product_name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    subcategory = Column(String, nullable=True)
    unit_cost = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)

class DimRegion(Base):
    """Dimension table for regions"""
    __tablename__ = "dim_region"
    
    region_key = Column(Integer, primary_key=True, index=True)
    region_id = Column(String, unique=True, nullable=False)
    region_name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    continent = Column(String, nullable=False)

class DimCustomer(Base):
    """Dimension table for customers"""
    __tablename__ = "dim_customer"
    
    customer_key = Column(Integer, primary_key=True, index=True)
    customer_id = Column(String, unique=True, nullable=False)
    customer_name = Column(String, nullable=False)
    customer_segment = Column(String, nullable=False)
    customer_type = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)