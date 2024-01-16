using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoLoginWithGoogle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginGoogleController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> LoginWithGoogle([FromBody] string credential)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                // này là demo nên tui để cái key ở đây luôn - ông có thể chỉnh lại thành key của mình nhé
                Audience = new List<string> { "1054109102936-lk59hetmio3bkttbvvcqmh4gf721jtlj.apps.googleusercontent.com" }
            };
            
            var payload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);

            if (payload == null)
            {
                return BadRequest();
            }
            return Ok(payload);
        }
    }
}
