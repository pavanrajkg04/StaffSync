-- 1. Tenants (Companies)
CREATE TABLE IF NOT EXISTS tenants (
    tenant_id UUID PRIMARY KEY,
    tenant_name VARCHAR NOT NULL,
    domain VARCHAR,
    contact_email VARCHAR NOT NULL,
    contact_phone VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR NOT NULL
);

-- 2. Users (Employees & Admins)
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(tenant_id),
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR,
    role VARCHAR NOT NULL,
    password_hash VARCHAR NOT NULL,
    profile_photo_url VARCHAR,
    manager_id UUID REFERENCES users(user_id),
    date_of_birth DATE,
    date_joined DATE,
    status VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, email)
);

-- 3. Departments
CREATE TABLE IF NOT EXISTS departments (
    department_id UUID PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(tenant_id),
    department_name VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Roles (Job Titles)
CREATE TABLE IF NOT EXISTS roles (
    role_id UUID PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(tenant_id),
    role_name VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Employee Roles (Job Assignments)
CREATE TABLE IF NOT EXISTS employee_roles (
    user_role_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    role_id UUID REFERENCES roles(role_id),
    department_id UUID REFERENCES departments(department_id),
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Attendance
CREATE TABLE IF NOT EXISTS attendance (
    attendance_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    tenant_id UUID REFERENCES tenants(tenant_id),
    date DATE NOT NULL,
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    location VARCHAR,
    status VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Leave Requests
CREATE TABLE IF NOT EXISTS leave_requests (
    leave_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    tenant_id UUID REFERENCES tenants(tenant_id),
    leave_type VARCHAR NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR NOT NULL,
    reason TEXT,
    approved_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Payroll
CREATE TABLE IF NOT EXISTS payroll (
    payroll_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    tenant_id UUID REFERENCES tenants(tenant_id),
    salary_month DATE NOT NULL,
    basic_salary DECIMAL,
    allowances DECIMAL,
    deductions DECIMAL,
    net_salary DECIMAL,
    tax_deductions DECIMAL,
    payment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Performance Reviews
CREATE TABLE IF NOT EXISTS performance_reviews (
    review_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    reviewer_id UUID REFERENCES users(user_id),
    tenant_id UUID REFERENCES tenants(tenant_id),
    review_date DATE NOT NULL,
    review_period_start DATE,
    review_period_end DATE,
    goals TEXT,
    achievements TEXT,
    rating INT,
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Training & Development
CREATE TABLE IF NOT EXISTS trainings (
    training_id UUID PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(tenant_id),
    training_name VARCHAR NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. User Trainings (Enrollments)
CREATE TABLE IF NOT EXISTS user_trainings (
    user_training_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    training_id UUID REFERENCES trainings(training_id),
    status VARCHAR NOT NULL,
    completion_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. Benefits & Perks
CREATE TABLE IF NOT EXISTS benefits (
    benefit_id UUID PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(tenant_id),
    benefit_name VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 13. User Benefits (Assigned)
CREATE TABLE IF NOT EXISTS user_benefits (
    user_benefit_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    benefit_id UUID REFERENCES benefits(benefit_id),
    assigned_date DATE NOT NULL,
    expiry_date DATE,
    status VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. Documents
CREATE TABLE IF NOT EXISTS documents (
    document_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    tenant_id UUID REFERENCES tenants(tenant_id),
    document_type VARCHAR NOT NULL,
    document_name VARCHAR NOT NULL,
    document_url VARCHAR NOT NULL,
    upload_date DATE NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    audit_id UUID PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(tenant_id),
    user_id UUID REFERENCES users(user_id),
    action_type VARCHAR NOT NULL,
    action_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
