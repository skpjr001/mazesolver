=======================================================================
## How to run it ## [linux machine]
=======================================================================

note- if permissions are not set , you can use 'chmod 777 ./MazeSolver' command to set permissions for everyone.
----------------------------------------------------------------------------------------------------------------

MazeSolver is a console application, to run it you need to open the console and browse to the location of the app.  
The program can be ran with the following command:

./MazeSolver IMAGE_FILE_NAME.jpg START_X START_Y END_X END_Y [SAVE_COST_MAP]

Where:  
IMAGE_FILE_NAME.jpg is the name of the image file with the maze.  
START_X/Y are the pixel coordinates of the maze entrance.  
END_X/Y are the pixel coordinates of the maze exit.  
[SAVE_COST_MAP] is an additional paramter, if added the program saves the maze cost map instead of the path through the maze.

So to run the app with one of the example mazes you need to write:
MazeSolver maze.jpg 13 300 670 300


## Licensing ##
All of the code except the jpg compression/decompression is licensed under the MIT license.
The jpgd library which is used for reading and writing jpg images is in the public domain, more info here:
https://code.google.com/p/jpeg-compressor/