const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const progress = document.querySelector('.reading-progress');
if (progress) {
  const updateProgress = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = height > 0 ? (window.scrollY / height) * 100 : 0;
    progress.style.width = `${Math.min(100, percentage)}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
}

const travelMapElement = document.querySelector('#travel-map');

if (travelMapElement && window.L) {
  const destinations = [
    { name: 'Australia', lat: -25.2744, lng: 133.7751, home: true },
    { name: 'Austria', lat: 47.5162, lng: 14.5501 },
    { name: 'Belgium', lat: 50.5039, lng: 4.4699 },
    { name: 'Bulgaria', lat: 42.7339, lng: 25.4858 },
    { name: 'Czechia', lat: 49.8175, lng: 15.473 },
    { name: 'France', lat: 46.2276, lng: 2.2137 },
    { name: 'Germany', lat: 51.1657, lng: 10.4515 },
    { name: 'Greece', lat: 39.0742, lng: 21.8243 },
    { name: 'Iceland', lat: 64.9631, lng: -19.0208 },
    { name: 'India', lat: 20.5937, lng: 78.9629 },
    { name: 'Ireland', lat: 53.1424, lng: -7.6921 },
    { name: 'Italy', lat: 41.8719, lng: 12.5674 },
    { name: 'Japan', lat: 36.2048, lng: 138.2529 },
    { name: 'Mexico', lat: 23.6345, lng: -102.5528 },
    { name: 'Netherlands', lat: 52.1326, lng: 5.2913 },
    { name: 'New Zealand', lat: -40.9006, lng: 174.886 },
    { name: 'Portugal', lat: 39.3999, lng: -8.2245 },
    { name: 'South Korea', lat: 35.9078, lng: 127.7669 },
    { name: 'Spain', lat: 40.4637, lng: -3.7492 },
    { name: 'Switzerland', lat: 46.8182, lng: 8.2275 },
    { name: 'Thailand', lat: 15.87, lng: 100.9925 },
    { name: 'Turkey', lat: 38.9637, lng: 35.2433 },
    { name: 'United Arab Emirates', lat: 23.4241, lng: 53.8478 },
    { name: 'United Kingdom', lat: 55.3781, lng: -3.436 },
    { name: 'United States', lat: 37.0902, lng: -95.7129 },
    { name: 'Vietnam', lat: 14.0583, lng: 108.2772 }
  ];

  const map = L.map(travelMapElement, {
    minZoom: 0,
    maxZoom: 8,
    scrollWheelZoom: false,
    worldCopyJump: true,
    zoomControl: false
  });

  L.control.zoom({ position: 'topright' }).addTo(map);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const markerGroup = L.featureGroup().addTo(map);
  const markerByCountry = new Map();
  const countryList = document.querySelector('.country-list');
  const resetButton = document.querySelector('.map-reset');

  const setActiveCountry = (name) => {
    document.querySelectorAll('.country-button').forEach((button) => {
      button.classList.toggle('active', button.dataset.country === name);
    });
  };

  destinations.forEach((destination) => {
    const markerIcon = L.divIcon({
      className: 'travel-marker-wrap',
      html: `<span class="travel-marker${destination.home ? ' home' : ''}"></span>`,
      iconSize: destination.home ? [18, 18] : [14, 14],
      iconAnchor: destination.home ? [9, 9] : [7, 7]
    });
    const popup = destination.home
      ? `<strong>${destination.name}</strong><small>Home</small>`
      : `<strong>${destination.name}</strong>`;
    const marker = L.marker([destination.lat, destination.lng], {
      icon: markerIcon,
      keyboard: true,
      title: destination.name
    }).bindPopup(popup).addTo(markerGroup);

    marker.on('click', () => setActiveCountry(destination.name));
    markerByCountry.set(destination.name, marker);

    if (countryList) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'country-button';
      button.dataset.country = destination.name;
      button.textContent = destination.name;
      button.setAttribute('aria-label', `Show ${destination.name} on the map`);
      button.addEventListener('click', () => {
        setActiveCountry(destination.name);
        map.setView([destination.lat, destination.lng], 4, { animate: true });
        markerByCountry.get(destination.name).openPopup();
      });
      countryList.appendChild(button);
    }
  });

  const showWholeWorld = () => {
    map.closePopup();
    setActiveCountry('');
    map.fitBounds(markerGroup.getBounds(), { padding: [24, 24], maxZoom: 2 });
  };

  showWholeWorld();
  resetButton?.addEventListener('click', showWholeWorld);
  window.addEventListener('resize', () => map.invalidateSize(), { passive: true });
}
