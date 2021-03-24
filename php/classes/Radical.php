<?php
	
	// to do - add a show as decimal function
	
	class Radical {
		
		public int $index;
	    public int $radicand;
	    
	    
	
	    public function __construct(int $index, int $radicand) {
		    		    
	        $this->index = $index;
	        $this->radicand = $radicand;
	    }
	    
	    public function display(): void {
		    echo $this->stringify();
	    }
	    
	    public function stringify(): string {
		    return $this->index." root ".$this->radicand;
	    }
	    
	    //public function multiply(Radical $multiple): Radical {
		
			/*
				
				multiplies two radical expressions
				
				parameters:
					r1: 2-length array of integers representing a radical expression (r1[0]-root-r1[1])
					r2: 2-length array of integers representing a radical expression (r2[0]-root-r2[1])
					
				returns:
					2-length array representing the simplified product
				
			*/
			
		    //$i = $this->index * $multiple->index;
		    //$r = $this->radicand * $multiple->radicand;
		    
		    //return (new Radical($i,$r))->simplify();
		//}
		
		public function simplify(): Radical {
		
			/*
				
				returns a radical in simplest form; e.g., 2-root-50 becomes 10-root-2
				
				parameters:
					c: the coefficient outside the radical
					r: the constant within the radical
					
				returns:
					2-length array with simplified c and r
				
			*/
		    
		    $squares = extract_pairs(prime_factorization($this->radicand));
		    
		    foreach ($squares as $s) {
		        $this->index *= $s;
		        $this->radicand /= $s*$s;
		    }
		    
		    return $this;
		}
	}
	
	
?>