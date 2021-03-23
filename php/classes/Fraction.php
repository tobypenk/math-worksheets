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
	    
	}
	
	
	
	
?>