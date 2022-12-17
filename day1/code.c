#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

typedef uint32_t t;

int
compare ( const void* a, const void* b )
{
    return (*(t*)a)<(*(t*)b);
}

int
main ( char* argv, int argc )
{
    FILE* file;
    file = fopen("input","r");
#ifdef TIMED
    uint16_t i = 0;
    do {
#endif
    t c[300] = {0};
    t currentCalory = 0;

    char* a = malloc(50);
    while ( fgets(a,50,file) )
    {
        t n = atoi(a);
        if ( n == 0 )
            currentCalory++;
        else
            c[currentCalory] += n;
        //printf("%d\n",atoi(a));
    }
    free(a);
    
    qsort( c,sizeof(c)/sizeof(t),sizeof(t),  compare );

#ifndef TIMED
    printf("%u %u\n",c[0],c[0]+c[1]+c[2]);
#endif

#ifdef TIMED
    rewind( file );
    i++;
    } while ( i < 1000);
#endif
    fclose(file);
    return 0;
}
