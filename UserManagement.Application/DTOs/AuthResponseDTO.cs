namespace UserManagement.Application.DTOs
{
    public class AuthResponseDTO
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public IList<string> Roles { get; set; }
        public string Token { get; set; }

        public string Image { get; set; }
    }
}
