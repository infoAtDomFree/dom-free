# Dom Free
## A state management system for JavaScript that will allow improved testability of client side code
## Why I built this system
I have been an agilista and evangelist for unit testing for many years.
However, along with others, I have considered JavaScript testing somewhat of a lost cause.
We have seen advancements in framework unit testing, but much of the JavaScript in the wild
remains untested, and largely untestable. This is principally because business logic is 
intermingled with DOM access code.

I thought if we could untangle that mess, we could make legitimately testable JavaScript code that operates upon the DOM indirectly. That is why I built this system.

## How it works
The system requires that you Register DOM elements and events, through the SMS. Here is the sequence of events:

* First, you register the DOM elements whose appearance you need to manage.
* Create a unit test file, and register the same DOM elements
* Then, start with one event source whose behavior you want to program

* Create a library, and add a method to contain the needed behavior
* 