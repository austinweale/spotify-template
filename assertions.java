public static int funky(int a, int digit) { // a and digit can be 
                                                //anything
    int count = 0;// always zero right here

    // Point A
    while (a != 0) {
 
        // Point B

        if (a % 10 == digit) { 
            count++;
            // Point C
        } else if (count > 0) { // only decrements when count > 0 
            count--;
            // Point D
        }
        a = a / 10;
    }

    // Point E :  may or may not have gone into loop
    return count;
}

/*
            a==0    a%10 == digit     count > 0
Point A     S       S               N
Point B     N       S               S   
Point C     N       A               A              
Point D    N          N              S
Point E    A        S               S        
*/