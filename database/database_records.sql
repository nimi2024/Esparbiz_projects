create database database_operation;
-- form
CREATE TABLE studentMaster AS SELECT * FROM pagination_filter.studentMaster;
CREATE TABLE attendenceMaster AS SELECT * FROM pagination_filter.attendenceMaster;
CREATE TABLE examMaster AS SELECT * FROM pagination_filter.examMaster;
CREATE TABLE subjectMaster AS SELECT * FROM pagination_filter.subjectMaster;

CREATE TABLE student_Master AS SELECT * FROM express.studentMaster;

CREATE TABLE 
 AS SELECT * FROM  march_7_job_application.studentMaster

CREATE TABLE basic_details AS SELECT * FROM  march_7_job_application.basic_details;
-- // Education master
CREATE TABLE  educational_master AS SELECT * FROM  march_7_job_application.educational_master;


ALTER TABLE educational_master  ADD CONSTRAINT  FOREIGN KEY (employee_Id) REFERENCES basic_details(id);
ALTER TABLE educational_master
MODIFY COLUMN edu_id  integer primary key auto_increment; 

-- education_details
CREATE TABLE education_details AS SELECT * FROM  march_7_job_application.education_details;
ALTER TABLE education_details  ADD CONSTRAINT  FOREIGN KEY (id) REFERENCES basic_details(id);
ALTER TABLE education_details
MODIFY COLUMN edu_id  integer primary key auto_increment; 

--  employee_details


CREATE TABLE employee_details AS SELECT * FROM  march_7_job_application.employee_details;

ALTER TABLE employee_details
MODIFY COLUMN id  integer primary key auto_increment; 

--  language_master



CREATE TABLE language_master AS SELECT * FROM  march_7_job_application.language_master;

ALTER TABLE language_master
MODIFY COLUMN lang_Id  integer primary key auto_increment; 

ALTER TABLE language_master  ADD CONSTRAINT  FOREIGN KEY (employee_Id) REFERENCES employee_details(id);
-- preferences
CREATE TABLE prefernce AS SELECT * FROM  march_7_job_application.prefernce;

ALTER TABLE prefernce
MODIFY COLUMN pref_Id  integer primary key auto_increment; 

ALTER TABLE prefernce  ADD CONSTRAINT  FOREIGN KEY (employee_Id) REFERENCES employee_details(id);

-- r
CREATE TABLE reference_contact AS SELECT * FROM  march_7_job_application.reference_contact;
ALTER TABLE  reference_contact
MODIFY COLUMN ref_Id  integer primary key auto_increment; 

ALTER TABLE  reference_contact  ADD CONSTRAINT  FOREIGN KEY (employee_Id) REFERENCES employee_details(id);

--reference_control
CREATE TABLE reference_control AS SELECT * FROM  march_7_job_application.reference_control;
ALTER TABLE  reference_control
MODIFY COLUMN ref_id  integer primary key auto_increment; 

ALTER TABLE  reference_control  ADD CONSTRAINT  FOREIGN KEY (id) REFERENCES employee_details(id);

-- Create registration_form
CREATE TABLE registration_form AS SELECT * FROM  march_7_job_application.registration_form;
ALTER TABLE registration_form
MODIFY COLUMN id integer primary key auto_increment; 

-- technology_master

CREATE TABLE technology_master AS SELECT * FROM  march_7_job_application.technology_master;
ALTER TABLE  technology_master
MODIFY COLUMN tech_Id  integer primary key auto_increment; 

ALTER TABLE  technology_master  ADD CONSTRAINT  FOREIGN KEY (employee_Id) REFERENCES employee_details(id);

--  work_experiance
CREATE TABLE  work_experiance AS SELECT * FROM  march_7_job_application.work_experiance;
ALTER TABLE   work_experiance
MODIFY COLUMN work_exp_id  integer primary key auto_increment; 

ALTER TABLE   work_experiance  ADD CONSTRAINT  FOREIGN KEY (id) REFERENCES employee_details(id);

--  work_experience
CREATE TABLE work_experience AS SELECT * FROM  march_7_job_application.work_experience;
ALTER TABLE  work_experience
MODIFY COLUMN wexp_Id  integer primary key auto_increment; 

ALTER TABLE  work_experience  ADD CONSTRAINT  FOREIGN KEY (employee_Id) REFERENCES employee_details(id);
ALTER TABLE studentMaster
MODIFY COLUMN student_id integer primary key auto_increment; 


ALTER TABLE student_Master
MODIFY COLUMN  unique_id integer primary key auto_increment; 

ALTER TABLE attendenceMaster
MODIFY COLUMN attend_id integer primary key auto_increment; 

ALTER TABLE examMaster
MODIFY COLUMN exam_id integer primary key auto_increment; 


ALTER TABLE subjectMaster
MODIFY COLUMN subject_id integer primary key auto_increment; 


ALTER TABLE attendenceMaster  ADD CONSTRAINT  FOREIGN KEY (student_id) REFERENCES studentMaster(student_id);
ALTER TABLE examMaster  ADD CONSTRAINT  FOREIGN KEY (student_id) REFERENCES studentMaster(student_id);

ALTER TABLE examMaster  ADD CONSTRAINT  FOREIGN KEY (subject_id) REFERENCES subjectMaster(subject_id);


-- form authentications

CREATE TABLE users AS SELECT * FROM march_7_job_application.users;
ALTER TABLE users
MODIFY COLUMN id integer primary key auto_increment; 

