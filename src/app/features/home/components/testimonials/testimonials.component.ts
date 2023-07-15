import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  testimonials = [
    {
      photo: '/assets/img/customer-1.jpeg',
      name: 'Raj',
      role: 'Freelance Graphic Designer',
      text: "As a freelancer, Dodo Draft's cover letter suggestions have been invaluable. They're tailored to each job proposal, making my applications stand out. I've secured more gigs thanks to Dodo Draft!",
    },
    {
      photo: '/assets/img/customer-2.jpeg',
      name: 'Sarah',
      role: 'Marketing Professional',
      text: "Dodo Draft has been a game-changer for my job search. The AI-assisted resume improvement feature helped me highlight my skills in ways I hadn't thought of. I've received more callbacks since I started using it.",
    },
    {
      photo: '/assets/img/customer-3.jpeg',
      name: 'Edwin',
      role: 'Software Engineer',
      text: "I was struggling with my job applications until I found Dodo Draft. It's user-friendly and effective. My resume has never looked better, and I've finally landed my dream job!",
    },
  ];
}
