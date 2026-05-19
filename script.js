// Local Vendor Database (Add your local area details here)
const vendors = [
    {
        id: 1,
        name: "Verma Electricals & Repair",
        category: "electronics",
        icon: "fa-plug",
        rating: "4.8",
        status: "Open Now",
        speciality: "Fan, Geyser, Extension Board Repairing",
        distance: "0.5 km from Campus",
        phone: "+919876543210"
    },
    {
        id: 2,
        name: "Sharma Plumbing Works",
        category: "plumbing",
        icon: "fa-faucet",
        rating: "4.5",
        status: "Open Now",
        speciality: "Tap leak, Flush repair, Water tank issues",
        distance: "1.2 km from Campus",
        phone: "+919876543211"
    },
    {
        id: 3,
        name: "Alpha Gadget & Laptop Care",
        category: "gadgets",
        icon: "fa-laptop",
        rating: "4.9",
        status: "Closes at 8 PM",
        speciality: "OS Installation, Screen replacement, Charging Ports",
        distance: "0.8 km from Campus",
        phone: "+919876543212"
    },
    {
        id: 4,
        name: "Gupta Hostel Stores",
        category: "stores",
        icon: "fa-store",
        rating: "4.6",
        status: "Open Now",
        speciality: "New/Second-hand Coolers, Mattresses, Study Tables",
        distance: "0.2 km from Campus",
        phone: "+919876543213"
    },
    {
        id: 5,
        name: "Express Appliance Repair",
        category: "electronics",
        icon: "fa-bolt",
        rating: "4.2",
        status: "24/7 Available",
        speciality: "Induction Cooker, Room Heater, Iron repair",
        distance: "1.5 km from Campus",
        phone: "+919876543214"
    }
];

const vendorGrid = document.getElementById('vendorGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

// Function to display cards
function displayVendors(vendorsToShow) {
    vendorGrid.innerHTML = '';
    
    if(vendorsToShow.length === 0) {
        vendorGrid.innerHTML = `
            <div class="col-span-full text-center py-12 text-slate-500">
                <i class="fa-solid fa-face-frown text-4xl mb-3"></i>
                <p class="text-lg font-medium">No service providers found.</p>
            </div>
        `;
        return;
    }

    vendorsToShow.forEach(vendor => {
        const cardHTML = `
            <div class="vendor-card border border-slate-800 rounded-2xl p-6 flex flex-col justify-between" data-category="${vendor.category}">
                <div>
                    <!-- Top section badge & rating -->
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-12 h-12 bg-indigo-600/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 text-xl">
                            <i class="fa-solid ${vendor.icon}"></i>
                        </div>
                        <div class="flex items-center space-x-2 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50 text-xs">
                            <i class="fa-solid fa-star text-amber-400"></i>
                            <span class="font-bold text-slate-200">${vendor.rating}</span>
                        </div>
                    </div>

                    <!-- Vendor Info -->
                    <h3 class="text-xl font-bold text-slate-100 mb-1">${vendor.name}</h3>
                    <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block mb-3">${vendor.status}</span>
                    
                    <p class="text-slate-400 text-sm mb-2"><strong class="text-slate-300">Speciality:</strong> ${vendor.speciality}</p>
                    <p class="text-slate-400 text-xs mb-4"><i class="fa-solid fa-location-dot text-rose-500 mr-1"></i> ${vendor.distance}</p>
                </div>

                <!-- Action Button -->
                <a href="tel:${vendor.phone}" class="w-full mt-4 bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-center py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center space-x-2 text-slate-200 hover:text-white">
                    <i class="fa-solid fa-phone-flip text-xs"></i>
                    <span>Call Provider Now</span>
                </a>
            </div>
        `;
        vendorGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Initial Call to display all data
displayVendors(vendors);

// Filter Logic
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');

        const category = e.target.getAttribute('data-category');
        if(category === 'all') {
            displayVendors(vendors);
        } else {
            const filtered = vendors.filter(v => v.category === category);
            displayVendors(filtered);
        }
        // Reset Search Bar during filtering
        searchInput.value = '';
    });
});

// Search Logic
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // Reset Active Category back to "All" during typing
    filterButtons.forEach(btn => btn.classList.remove('active'));
    filterButtons[0].classList.add('active');

    const filtered = vendors.filter(v => {
        return v.name.toLowerCase().includes(searchTerm) || 
               v.speciality.toLowerCase().includes(searchTerm) ||
               v.category.toLowerCase().includes(searchTerm);
    });
    displayVendors(filtered);
});
