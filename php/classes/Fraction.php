<?php
	
	class Fraction {

	    public int $numerator;
	    public int $denominator;
	
	    public function __construct(int $numerator, int $denominator) {
	        $this->numerator = $numerator;
	        $this->denominator = $denominator;
	    }
	    
	    public function display(): void {
	        echo $this->numerator . "/" . $this->denominator;
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
		    
		    return (new Fraction($n,$d))->simplify();
		}
		
		public function simplify(): Fraction {
		
			/*
				
				reduces a fraction to simplest form (i.e., the form in which numerator and denominator share no factors)
				
				parameters:
					n_d_array: 2-length array of ints
					
				returns:
					2-length array representing the simplified fraction. 0th element is numerator; 1st element is denominator.
				
			*/
			
		    $n_pf = prime_factorization($this->numerator);
		    $d_pf = prime_factorization($this->denominator);
		    
		    if (is_null($n_pf) | is_null($d_pf)) {
			    $common_factors = [];
		    } else {
			    $common_factors = array_overlap($n_pf,$d_pf);
		    }
		    
		    foreach ($common_factors as $i) {
		        $this->numerator /= $i;
		        $this->denominator /= $i;
		    }
		    
		    if ($this->denominator < 0 && $this->numerator > 0) {
		        $this->numerator *= -1;
		        $this->denominator *= -1;
		    }
		    
		    return $this;
		}
		
		public function subtract(Fraction $addend): Fraction {
		
			/*
			    
			    subtracts two fractions, which may or may not have common denominators
			    
			    parameters:
			    	f1: 2-length array of integers
			    	f2: 2-length array of integers
			    	for f1 and f2, array[0] is the numerator; array[1] is the denominator
			    
			    returns:
			    	2-length array representing f1 - f2
			    	
			*/
			
			
		    
		    $n = $this->numerator  * $addend->denominator - $addend->numerator * $this->denominator;
		    $d = $this->denominator * $addend->denominator;
		    
		    return (new Fraction($n,$d))->simplify();
		}
		
		public function multiply(Fraction $multiple): Fraction {
		
			/*
			    
			    multiplies two fractions
			    
			    parameters:
			    	f1: 2-length array of integers
			    	f2: 2-length array of integers
			    	for f1 and f2, array[0] is the numerator; array[1] is the denominator
			    
			    returns:
			    	2-length array representing f1 * f2
			    	
			*/
		    
		    $n = $this->numerator * $multiple->numerator;
		    $d = $this->denominator * $multiple->denominator;
		    
		    return (new Fraction($n,$d))->simplify();
		}
		
		public function divide(Fraction $dividend): Fraction {
		
			/*
			    
			    divides two fractions, which may or may not have common denominators
			    
			    parameters:
			    	f1: 2-length array of integers
			    	f2: 2-length array of integers
			    	for f1 and f2, array[0] is the numerator; array[1] is the denominator
			    
			    returns:
			    	2-length array representing f1 / f2
			    	
			*/
			
		    $n = $this->numerator * $dividend->denominator;
		    $d = $this->denominator * $dividend->numerator;
		    
		    return (new Fraction($n,$d))->simplify();
		}
	
		
	}
	
	
	
	
?>




