import Facebook from "../assets/facebook.png";
import Whatsapp from "../assets/watsap.png";
import Instagram from "../assets/instagram.png";
import TikTok from "../assets/tiktok.png";
import { Link } from "react-router-dom";

function CustomerHelp({ type }) {
  return (
    <>
      <div className="customerCare">
        {type === "contact us" ? (
          <div className="customerCare-1">
            <h4>Contact Methods</h4>
            <p>Our support team is available through the following channels:</p>
            <ul>
              <li>Email: support@aion.com</li>
              <li>Phone: +256768520373</li>
              <li>Live Chat: Available 24/7 on our websites</li>
            </ul>
            <div className="customerCare-1-1">
              <Link>
                <img src={Facebook} alt="Faceebook" />
              </Link>
              <Link>
                <img src={Whatsapp} alt="Whatsap" />
              </Link>
              <Link>
                <img src={Instagram} alt="Instagram" />
              </Link>
              <Link>
                <img src={TikTok} alt="TikTok" />
              </Link>
              <Link></Link>
            </div>
          </div>
        ) : type === "support hours" ? (
          <div className="customerCare-1">
            <h4>Support Hours</h4>
            <p>Our support team is available during the following hours:</p>
            <ul>
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        ) : type === "faqs" ? (
          <div className="customerCare-1">
            <h4>Frequently Asked Questions</h4>
            <p>Find answers to common questions in our FAQ section:</p>
            <ul>
              <li>
                <a href="/faq">How to list your property for sale?</a>
              </li>
              <li>
                <a href="/faq">How to list your property for rent?</a>
              </li>
              <li>
                <a href="/faq">
                  What documents are needed for property transactions?
                </a>
              </li>
              <li>
                <a href="/faq">How to schedule a property viewing?</a>
              </li>
              <li>
                <a href="/faq">How to finance a property purchase?</a>
              </li>
              <li>
                <a href="/faq">What is the process for buying a car?</a>
              </li>
              <li>
                <a href="/faq">How to list your car for sale?</a>
              </li>
              <li>
                <a href="/faq">
                  What documents are required for car transactions?
                </a>
              </li>
              <li>
                <a href="/faq">How to rent a car?</a>
              </li>
              <li>
                <a href="/faq">
                  What are the insurance options for renting a car?
                </a>
              </li>
              <li>
                <a href="/faq">How to hire a service for a party?</a>
              </li>
              <li>
                <a href="/faq">What types of party services are available?</a>
              </li>
              <li>
                <a href="/faq">How to get a quote for party services?</a>
              </li>
              <li>
                <a href="/faq">
                  What are the cancellation policies for party services?
                </a>
              </li>
              <li>
                <a href="/faq">
                  How to contact a service provider for a party?
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="customerCare-1">
            <h4>Support Resources</h4>
            <p>Explore our support resources:</p>
            <ul>
              <li>
                <a href="/help-center">Help Center</a>
              </li>
              <li>
                <a href="/tutorials">Video Tutorials</a>
              </li>
              <li>
                <a href="/community">Community Forums</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default CustomerHelp;
