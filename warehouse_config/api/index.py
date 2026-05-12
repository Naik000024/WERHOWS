"""
Vercel Serverless Function Handler for Django.
"""
import os
import sys

# Ensure the inner project directory is on the path
# We need to find 'warehouse_config.settings'
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'warehouse_config.settings')

from django.core.wsgi import get_wsgi_application
app = get_wsgi_application()
