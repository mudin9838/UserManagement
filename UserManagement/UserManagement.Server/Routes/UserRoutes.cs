namespace UserManagement.Server.Routes;

public static class UserRoutes
{
    public const string GetAllUserDetails = "GetAllUserDetails";
    public const string GetUserDetailsByUserId = "GetUserDetails/{userId}";
    public const string GetUserDetailsByUserName = "GetUserDetailsByUserName/{userName}";
    public const string AssignRoles = "AssignRoles";
    public const string UpdateUserRoles = "EditUserRoles";
    public const string UpdateUserProfileById = "EditUserProfile/{id}";
    public const string UpdatePasswordByUserName = "ChangePassword/{userName}";
    public const string DeleteByUserId = "Delete/{userId}";
}