<?php
	
	class Fraction {

	    public float $numerator;
	    public float $denominator;
	
	
	    public function __construct(float $numerator, float $denominator) {
	        $this->numerator = $numerator;
	        $this->denominator = $denominator;
	    }
	    
	    public function display_fraction(): void {
	        echo $this->numerator . " " . $this->denominator;
	    }
	    
	    
	    
	    
	    public function add(Fraction $addend): Fraction {
	    
		    /*
			    
			    adds two fractions, which may or may not have common denominators
			    
			    parameters:
			    	f1: 2-length array of integers
			    	f2: 2-length array of integers
			    	for f1 and f2, array[0] is the numerator; array[1] is the denominator
			    
			    returns:
			    	2-length array representing the summed, simplified fraction
			    	
			*/
		    
		    //$n = $f1[0] * $f2[1] + $f2[0] * $f1[1];
		    //$d = $f1[1] * $f2[1];

			$n = $this->numerator * $addend->denominator + $addend->numerator * $this->denominator;
		    $d = $this->denominator * $addend->denominator;
		    
		    return new Fraction($n,$d);
		}
	    
	}
	
	
	
	
?>




