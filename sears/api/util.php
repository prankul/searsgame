
<?php
            function casttoclass($class, $object)
    {
      return unserialize(preg_replace('/^O:\d+:"[^"]++"/', 'O:' . strlen($class) . ':"' . $class . '"', serialize($object)));
    }

    ?>
             