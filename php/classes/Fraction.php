<?php
	
	class Fraction {

	    public int $numerator;
	    public int $denominator;
	
	    public function __construct(int $numerator, int $denominator) {
	        $this->numerator = $numerator;
	        $this->denominator = $denominator;
	    }
	    
	    public function display(): void {
	        echo $this->stringify();
	    }
	    
	    public function stringify(): string {
	        return $this->numerator . "/" . $this->denominator;
	    }
	    
	    public function add(Fraction $addend): Fraction {
	    
		    /*
			    
			    adds two fractions, which may or may not have common denominators
			    
			    parameters:
			    	addend: fraction to be added to this
			    
			    returns:
			    	the summed fraction (does not modify this)
			    	
			*/

			$n = $this->numerator * $addend->denominator + $addend->numerator * $this->denominator;
		    $d = $this->denominator * $addend->denominator;
		    
		    return (new Fraction($n,$d))->simplify();
		}
		
		public function simplify(): Fraction {
		
			/*
				
				reduces a fraction to simplest form (i.e., the form in which numerator and denominator share no factors)
				
				parameters:
					none
					
				returns:
					the simplified fraction (also modifies this)
				
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
			    	addend: fraction to be subtracted
			    
			    returns:
			    	subtracted fraction (does not modify this in place)
			    	
			*/
			
		    $n = $this->numerator  * $addend->denominator - $addend->numerator * $this->denominator;
		    $d = $this->denominator * $addend->denominator;
		    
		    return (new Fraction($n,$d))->simplify();
		}
		
		public function multiply(Fraction $multiple): Fraction {
		
			/*
			    
			    multiplies two fractions
			    
			    parameters:
			    	multiple: fraction to be multiplied
			    
			    returns:
			    	the product of this and multiple (does not modify this)
			    	
			*/
		    
		    $n = $this->numerator * $multiple->numerator;
		    $d = $this->denominator * $multiple->denominator;
		    
		    return (new Fraction($n,$d))->simplify();
		}
		
		public function divide(Fraction $dividend): Fraction {
		
			/*
			    
			    divides two fractions, which may or may not have common denominators
			    
			    parameters:
			    	dividend: fraction by which to divide this
			    
			    returns:
			    	divided fraction (does not modify this)
			    	
			*/
			
		    $n = $this->numerator * $dividend->denominator;
		    $d = $this->denominator * $dividend->numerator;
		    
		    return (new Fraction($n,$d))->simplify();
		}
	}
	
	
	
	
?>




