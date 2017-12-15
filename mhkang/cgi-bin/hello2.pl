#!/usr/bin/perl
use CGI qw(:standard);

my $a1 = 10;
my $a2 = 20;


print header
	, start_html("Hello")
	, h1("Hello World")
	, p("Hello everybody." . $a1 . $a2)
	, end_html;