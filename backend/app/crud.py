from sqlalchemy.orm import Session
from . import models, schemas


def create_todo(db: Session, todo: schemas.TodoCreate):
    """Create a new todo item"""
    db_todo = models.Todo(title=todo.title, description=todo.description)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def get_todos(db: Session, skip: int = 0, limit: int = 100):
    """Get all todo items"""
    return db.query(models.Todo).offset(skip).limit(limit).all()


def get_todo(db: Session, todo_id: int):
    """Get a single todo item by ID"""
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()


def update_todo(db: Session, todo_id: int, todo: schemas.TodoUpdate):
    """Update a todo item"""
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not db_todo:
        return None
    
    update_data = todo.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_todo, field, value)
    
    db.commit()
    db.refresh(db_todo)
    return db_todo


def delete_todo(db: Session, todo_id: int):
    """Delete a todo item"""
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not db_todo:
        return None
    
    db.delete(db_todo)
    db.commit()
    return db_todo

