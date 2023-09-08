﻿using System.ComponentModel.DataAnnotations;

namespace WebShopApi.DTO
{
    public class ProductDto
    {
        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string Price { get; set; }
        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string Quantity { get; set; }
        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string Description { get; set; }
        [Required(ErrorMessage = "The field with name {0} is required.")]
        public string Image { get; set; }
    }
}
