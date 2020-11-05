create database covid_map;
use covid_map;
set sql_safe_updates = 0;
create table us
	( 
	name varchar(255),
	cases numeric,
	deaths numeric,
	primary key (name)
	);
    
create table states_deaths
	(
    info_date date,
    state varchar(255),
    deaths numeric,
    confirmed_deaths numeric,
    probable_deaths numeric,
    primary key (info_date, state)
	);

create table states_cases
	(
    info_date date,
    state varchar(255),
    cases numeric, 
	confirmed_cases numeric,
    probable_cases numeric,
    primary key (info_date, state)
	);
    
create table counties_deaths
	(
    info_date date,
    county varchar(255),
    state varchar(255),
	deaths numeric,
    confirmed_deaths numeric,
    probable_deaths numeric,
    primary key (info_date, county, state)
	);

create table counties_cases
	(
    info_date date,
    county varchar(255),
    state varchar(255),
    cases numeric, 
	confirmed_cases numeric,
    probable_cases numeric,
    primary key (info_date, county, state)
	);
    
create table prisons_cases
	(
    info_date date,
    state varchar(255),
    staff_cases numeric,
    inmate_cases numeric,
    primary key(info_date, state)
	);

create table prisons_deaths
	(
    info_date date,
    state varchar(255),
    staff_deaths numeric,
    inmate_deaths numeric,
    primary key(info_date, state)
	);
