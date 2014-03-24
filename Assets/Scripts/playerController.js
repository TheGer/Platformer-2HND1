#pragma strict

//declare an animator object
private var anim:Animator;

function Start () {
	//get the animation component of the player at the START of the game
	anim = GetComponent(Animator);
}

function Update () {
	//by default, stay in idle state
	anim.SetInteger("MovingLeft",0);
	anim.SetInteger("MovingRight",0);
	
	//pressing left arrow moves the character to the left
	if (Input.GetAxis("Horizontal") < 0)
	{
		anim.SetInteger("MovingLeft",1);
		
	}
	
	if (Input.GetAxis("Horizontal") > 0)
	{
		anim.SetInteger("MovingRight",1);
		
	}

}