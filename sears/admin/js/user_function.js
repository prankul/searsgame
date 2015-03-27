function MyClass()
{
    this.myData = 5;
    this.myString = "Hello World";
    this.ShowData = DisplayData;
    this.ShowString = DisplayString;
}

function DisplayData()
{
    alert( this.myData );
}

function DisplayString()
{
    alert( this.myString ); 
}



