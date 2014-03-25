#pragma strict
//declare an animator object
private var anim:Animator;
private var OnGround:boolean;
/*
1. Declare a boolean variable OnGround
2. If OnGround, the player can jump
3. To Jump, when the player presses the up arrow, add a force of 1000 up, ForceMode.Impulse
*/
function Start () {
	//get the animation component of the player at the START of the game
	anim = GetComponent(Animator);
	OnGround = false;
}
//started to hit ground
function OnCollisionStay(c:Collision)
{
	//Debug.Log("hit ground");
	//Debug.Log(c.gameObject.tag);
	if (c.gameObject.tag == "ground")
	{
		OnGround = true;
	}
}
//staying on the ground
function OnCollisionExit(c:Collision)
{
	if (c.gameObject.tag == "ground")
	{
		OnGround = false;
	}
}

function Update () {
	Debug.Log(OnGround);
	//falling force -100 down
	rigidbody.AddForce(Vector3(0,-150,0),ForceMode.Acceleration);

	if (OnGround)
	{
		//jump
		if (Input.GetKeyDown(KeyCode.Space))
		{
			//Debug.Log("jump");
			rigidbody.AddForce(Vector3(0,5000,0));
		}
		
	}

	//move player left and right
	transform.Translate(Vector3.right * 10 * Input.GetAxis("Horizontal") * Time.deltaTime);

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