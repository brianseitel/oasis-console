<?

abstract class Oasis_Console {

	private $command;
	private $data;
	private $args;

	public function __construct($data) {
		$this->data = $data;
		$tokens = $this->tokenize();
		$this->execute();
	}

	private function tokenize() {
		$token = strtok($this->data,' ');
		while ($token) {
			// find double quoted tokens
			if ($token{0}=='"') { $token .= ' '.strtok('"').'"'; }
			// find single quoted tokens
			if ($token{0}=="'") { $token .= ' '.strtok("'")."'"; }

			$tokens[] = $token;
			$token = strtok(' ');
		} 

		$this->command = array_shift($tokens);
		$this->args = $tokens;
	}

	private function execute() {
		$class = get_called_class();
		$method = $class.'::'.$this->command;
		// echo "Calling {$method}...";
		if (method_exists($class, $this->command)) {
			$obj = new $class;
			$obj->{$this->command}($this->args);
		} else
			die('foo');
	}
	
	public function __success($data) {
		die('<span>'.$data.'</span>');
	}

	public function __error($data) {
		die('<span style="color: #FF0000;">Error: '.$data.'</span>');
	}
}