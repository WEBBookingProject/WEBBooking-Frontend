// ============================================
// Компонент: Footer
// Використовується: на MainLayout
// ============================================
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="central-container">
        <div className="footer-column">
          <span>Countries</span>
          <span>Regions</span>
          <span>Cities</span>
          <span>Districts</span>
          <span>Airports</span>
          <span>Hotels</span>
          <span>Places of interest</span>
        </div>

        <div className="footer-column">
          <span>Homes</span>
          <span>Apartments</span>
          <span>Resorts</span>
          <span>Villas</span>
          <span>Hostels</span>
          <span>B&Bs</span>
          <span>Guest houses</span>
        </div>

        <div className="footer-column">
          <span>Unique places to stay</span>
          <span>All destinations</span>
          <span>All flight destinations</span>
          <span>All car hire locations</span>
          <span>Discover</span>
          <span>Reviews</span>
          <span>Awards</span>
        </div>

        <div className="footer-column">
          <span>Car hire</span>
          <span>Flight finder</span>
          <span>Restaurant reservations</span>
          <span>For Travel Agents</span>
        </div>

        <div className="footer-column">
          <span>Coronavirus (COVID-19) FAQs</span>
          <span>About Booking.com</span>
          <span>Customer Service help</span>
          <span>Partner help</span>
          <span>Careers</span>
          <span>Sustainability</span>
          <span>Press centre</span>
          <span>Safety resource centre</span>
          <span>Investor relations</span>
          <span>Terms & Conditions</span>
          <span>Partner dispute</span>
          <span>How we work</span>
          <span>Privacy & Cookie Statement</span>
          <span>MSA Statement</span>
          <span>Corporate contact</span>
          <span>We Price Match</span>
        </div>
      </div>
    </footer>
  );
}
