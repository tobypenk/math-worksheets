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
	    
		public function multiply(Radical $multiple): Radical {
		
			/*
				
				gives the product of this and another radical
				
				parameters:
					multiple: radical by which to multiply
					
				returns:
					radical representing the product of this and multiple
				
			*/
			
		    $i = $this->index * $multiple->index;
		    $r = $this->radicand * $multiple->radicand;
		    
		    return (new Radical($i,$r))->simplify();
		}
		
		public function simplify(): Radical {
		
			/*
				
				modifies this to simplest form; e.g., 2-root-50 becomes 10-root-2
				
				parameters:
					none (takes instance parameters)
					
				returns:
					none (modifies this in place)
				
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