<?php
	
	assert_options(ASSERT_ACTIVE, 1);
	assert_options(ASSERT_WARNING, 0);
	assert_options(ASSERT_QUIET_EVAL, 1);
	assert_options(ASSERT_CALLBACK, 'handle_assertion');
	
	function handle_assertion($file, $line, $code, $desc = null) {
		
	    echo "Assertion failed at $file:$line: $code";
	    if ($desc) {
	        echo ": $desc";
	    }
	    echo "\n";
	}
	
?>