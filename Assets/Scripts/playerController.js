#pragma strict
//declare an animator object
private var anim:Animator;
private var OnGround:boolean;


//the next platform to be generated at a random y

var nextPlatform:Rigidbody;

function createPlatforms()
{
	var playerX:int;
	
	var ypos:float;
	
	playerX = transform.position.x;
	
	//this for loop will run for six times
	for (var i=0;i<7;i++)
	{
		//random Y value
		ypos = Random.Range(-2,1);
		//no overlap	
		if (Physics.OverlapSphere(Vector3(playerX+5+i*5,ypos,0),1.5).Length==0)
		{
		//create six platforms ahead of the player and displaced by 5 from each other in X
		Instantiate(nextPlatform,Vector3(playerX+5+i*5,ypos,0),Quaternion.identity);
		}
	
	
	}
	
}



function Start () {
	//get the animation component of the player at the START of the game
	anim = GetComponent(Animator);
	OnGround = false;
	transform.position.x = 1;
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
Debug.Log(transform.position.x%24.0);
	if ((transform.position.x+10.0)%24.0 < 0.3) {
		//create platforms
		Debug.Log(transform.position.x%24.0);
		Debug.Log("Create new platforms");
		createPlatforms();
		//to make sure that createPlatforms is called once, move the player forward slightly
		transform.position.x += 0.3;
		
	}

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