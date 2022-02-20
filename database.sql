-- Sample data based on an average day in the life of Mo :)

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL,
	"description" VARCHAR(300),
	"priority" VARCHAR(8),
	"isItDone" BOOLEAN DEFAULT FALSE
	);
	
INSERT INTO "todo"
	("task", "description", "priority")
VALUES
	('Run', 'Go for a morning 30-minute run before 7:30 AM', 'Medium'),
	('Shower', 'Take shower after run', 'Medium'),
	('Get ready', 'Get dressed, brush teeth, etc', 'Medium'),
	('Take supplements', 'Take Ashwa, L-Theanine, Vitamin D, etc', 'Medium'),
	('Review Work', 'Go through previous night homework', 'Medium'),
	('Class', 'Attend first part of day classes', 'Urgent'),
	('Lunch', 'Lunch at noon sharp', 'Low'),
	('Class part 2', 'Attend second half of day', 'Urgent'),
	('Afternoon break', 'Eat dinner, take 30 minutes off', 'Medium'),
	('Evening homework', 'Spend a couple hours on homework', 'Urgent'),
	('Extra credit', 'Make yourself ref materials, update practice repo', 'Low'),
	('Dark Souls', 'Play some Dark Souls for a little bit to wind down somehow', 'Urgent'),
	('Prep for morning', 'Make sure devices are charged, prep coffee, prep pre-workout', 'Low'),
	('Toast', 'Eat nightly snack of toast around 10 pm', 'Urgent'),
	('Teeth', 'Whiten/Brush/Floss/Swish/apply retainer', 'Medium'), 
	('Bedtime', 'Be in bed by 11 PM', 'Medium');

    SELECT * FROM "todo" LIMIT 50;