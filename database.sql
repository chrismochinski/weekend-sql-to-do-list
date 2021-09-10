-- Sample data based on an average day in the life of Mo :)

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL,
	"description" VARCHAR(300),
	"isItDone" BOOLEAN DEFAULT FALSE
	);
	
INSERT INTO "todo"
	("task", "description")
VALUES
	('Run', 'Go for a morning 30-minute run before 7:30 AM'),
	('Shower', 'Take shower after run'),
	('Get ready', 'Get dressed, brush teeth, etc'),
	('Take supplements', 'Take Ashwa, L-Theanine, Vitamin D, etc'),
	('Review Work', 'Go through previous night homework'),
	('Class', 'Attend first part of day classes'),
	('Lunch', 'Lunch at noon sharp'),
	('Class part 2', 'Attend second half of day'),
	('Afternoon break', 'Eat dinner, take 30 minutes off'),
	('Evening homework', 'Spend a couple hours on homework'),
	('Extra credit', 'Make yourself ref materials, update practice repo'),
	('Dark Souls', 'Play some Dark Souls for a little bit to wind down somehow'),
	('Prep for morning', 'Make sure devices are charged, prep coffee, prep pre-workout'),
	('Toast', 'Eat nightly snack of toast around 10 pm'),
	('Teeth', 'Whiten/Brush/Floss/Swish/apply retainer'), 
	('Bedtime', 'Be in bed by 11 PM');

    SELECT * FROM "to-do" LIMIT 50;