package com.miammiam.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import java.util.UUID;

@Entity
public class Product {
    @Id
    private String id = UUID.randomUUID().toString();

    private String name;
    private String description;

    @Column(length = 100000)
    private String imageBase64;

    private double rating; 

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageBase64() { return imageBase64; }
    public void setImageBase64(String imageBase64) { this.imageBase64 = imageBase64; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
}
