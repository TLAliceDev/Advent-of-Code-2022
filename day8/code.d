import std.stdio;
import std.file;

const SIZE = 99;


byte charToInt(char c)
{
    return (c >= 48 && c <= 57) ? cast(byte)(c - 48) : -1;
}

byte[SIZE][SIZE] readForest( File inputFile)
{
    int currentLine = 0;
    byte[SIZE][SIZE] forestArray;
    while ( !inputFile.eof ) {
        if (currentLine >= SIZE)
            break;
        string line = inputFile.readln();
        foreach (i; 0 .. line.length-1) {
            forestArray[currentLine][i] = charToInt( line[i] );
        }
        currentLine++;
    }
    return forestArray;
}

void printVisibility( byte[SIZE][SIZE] visibility ) {
    foreach (i; 0 .. SIZE) {
        foreach (j; 0 .. SIZE) {
            printf("%d", visibility[i][j] );
        }
        printf("\n");
    }
}

enum {
    NOTVISIBLE,
    EAST,
    NORTH,
    WEST,
    SOUTH,
};

int checkScore(int x, int y, byte[SIZE][SIZE] forest) {
    if (x == 0 || x == SIZE-1 || y == 0 || y == SIZE-1)
        return 0;
    int cx,cy;
    cx = x-1;
    cy = y-1;
    byte height = forest[x][y];
    byte currentTree = forest[x][cy]; 
    int scoreNorth = 1, scoreSouth = 1, scoreEast = 1, scoreWest = 1;
    while (currentTree < height && cy > 0) {
        scoreNorth++;
        cy--;
        currentTree = forest[x][cy];
    }
    cy = y+1;
    currentTree = forest[x][cy]; 
    while (currentTree < height && cy < SIZE-1) {
        scoreSouth++;
        cy++;
        currentTree = forest[x][cy];
    }
    currentTree = forest[cx][y]; 
    while (currentTree < height && cx > 0) {
        scoreEast++;
        cx--;
        currentTree = forest[cx][y];
    }
    cx = x+1;
    currentTree = forest[cx][y]; 
    while (currentTree < height && cx < SIZE-1) {
        scoreWest++;
        cx++;
        currentTree = forest[cx][y];
    }
    return scoreNorth*scoreWest*scoreEast*scoreSouth;
}

int
partone(byte[SIZE][SIZE] forest)
{
    byte[SIZE][SIZE] visible;
    int visibleAmount = 0;
    foreach (i; 0 .. SIZE) {
        byte biggestHeightEast   = -1;
        byte biggestHeightNorth  = -1;
        byte biggestHeightWest   = -1;
        byte biggestHeightSouth  = -1;
        foreach (j; 0 .. SIZE/2) {
            byte EWM = forest[i][j];
            byte WEM = forest[i][SIZE-1-j];
            byte NSM = forest[j][i];
            byte SNM = forest[SIZE-1-j][i];
            if (EWM > biggestHeightEast) {
                biggestHeightEast = EWM;
                if (!visible[i][j])
                {
                    visible[i][j] = EAST;
                    visibleAmount++;
                }
            }
            if (NSM > biggestHeightNorth) {
                biggestHeightNorth = NSM;
                if (!visible[j][i])
                {
                    visible[j][i] = NORTH;
                    visibleAmount++;
                }
            }
            if (WEM > biggestHeightWest) {
                biggestHeightWest= WEM;
                if (!visible[i][SIZE-1-j])
                {
                    visible[i][SIZE-1-j] = WEST;
                    visibleAmount++;
                }
            }
            if (SNM > biggestHeightSouth) {
                biggestHeightSouth = SNM;
                if (!visible[SIZE-1-j][i])
                {
                    visible[SIZE-1-j][i] = SOUTH;
                    visibleAmount++;
                }
            }
        }
    }
    printVisibility( visible );
    return visibleAmount;
}

int parttwo( byte[SIZE][SIZE] forest ) {
    int highestScore = 0;
    foreach (i; 0 .. SIZE) {
        foreach (j; 0 .. SIZE) {
            int newScore = checkScore(i,j,forest);
            if (newScore > highestScore)
            {
                writeln("New high score: ", newScore);
                highestScore = newScore;
            }
        }
    }
    return highestScore;
}

void main() {
    File inputFile = File("input","r");
    byte[SIZE][SIZE] forest = readForest(inputFile);
    writeln(partone(forest));
    writeln(parttwo(forest));
    inputFile.close();
    return;
}
