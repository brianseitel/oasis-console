<?

class Mirage_Console extends Oasis_Console {

	public function __construct($data = null) {
		if ($data)
			parent::__construct($data);
	}

	public function hello($args) {
		$this->__success('Hello, '.implode(' ', $args));
	}

	public function queue($args) {
		$action = array_shift($args);
		$qty = array_shift($args);

		if (!$action || !in_array($action, array('add', 'remove', 'clear')))
			$this->__error('First argument must be "add", "remove" or "clear".');

		if ($action == 'clear')
			$this->__success('Successfully cleared the queue.');

		if (!is_numeric($qty))
			$this->__error('Second argument must be an integer.');

		if ($action == 'add')
			$this->__success('Successfully added '.$qty.' items to the queue.');

		if ($action == 'remove')
			$this->__success('Successrully removed '.$qty.' items from the queue.');

	}
}