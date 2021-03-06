﻿using Microsoft.IdentityModel.Tokens;
using System;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using time4movies.Models;

namespace time4movies.UI.Auth
{
    public class TokenGenerator
    {
        //TODO: Put these values in webconfig
        public static readonly string TOKEN_SECRET = "t1m34m@v13s_DEVAPP_secretKey1234";
        public static readonly string ISSUER       = "www.time4movies.com";
        public static readonly string AUDIENCE     = "time4movies.com";


        public static string Build(AppUser user)
        {
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Jti       , Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Acr       , user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
                new Claim(JwtRegisteredClaimNames.AuthTime  , user.CreateDate.ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName , user.FirstName),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
                new Claim(JwtRegisteredClaimNames.Email     , user.Email),
                new Claim(ClaimTypes.Role                   , user.UserType),
                new Claim(JwtRegisteredClaimNames.Iat,
                    DateTimeToUnixTimestamp(DateTime.Now)
                    .ToString(CultureInfo.InvariantCulture),
                    ClaimValueTypes.Integer64)
            };

            var token = new JwtSecurityToken(
                              issuer            : ISSUER,
                              audience          : AUDIENCE,
                              claims            : claims,
                              expires           : DateTime.UtcNow.AddDays(1000),
                              signingCredentials: new SigningCredentials(Create(TOKEN_SECRET),
                                                    SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static double DateTimeToUnixTimestamp(DateTime dateTime)
        {
            return (dateTime - new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc)).TotalSeconds;
        }

        public static SymmetricSecurityKey Create(string secret)
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
        }
    }
}
