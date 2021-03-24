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
		
		public function add(Radical $addend): Radical {
		
			/*
				
				adds another radical to this (assumes radicands are compatible)
				
				parameters:
					none (uses instance data)
					
				returns:
					radical representing the sum of this and addend
				
			*/
			
		    $r1 = $this->simplify();
		    $r2 = $addend->simplify();
		    
		    if ($this->radicand == $addend->radicand) {
			    return (new Radical($this->index + $addend->index, $this->radicand));
		    } else {
			    return $this;
		    }
		}
		
		public function square(): int {
			
			//to do
			
			$x = $this->multiply($this);
			return $x->index * $x->radicand;
		}
		
		public function multiply_by_conjugate(Radical $multiple) {
			//to do
			/*
				
				finds the conjugate of two radical expressions - (c1-root-r1 squared minus c2-root-r2 squared)
					used for rationalizing radical expressions
				
				parameters:
					r1: 2-length array of integers representing [c1,r1]
					r2: 2-length array of integers representing [c2,r2]
				
				returns:
					integer representing the conjugate of the two radicals
					
			*/
		
		    $t1 = $this->square();
		    $t2 = $multiple->square();
		    
		    return $t1 - $t2;
		    
		    //return new Radical(1,1);
		}
	}
	
	
	
?>