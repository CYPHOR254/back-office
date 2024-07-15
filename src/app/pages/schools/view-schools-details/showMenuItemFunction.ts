// utility.ts (adjust filename and path as per your structure)
export function showMenuItemFunction(profiles: string[]): boolean {
    if (profiles.length === 0) {
      return true; // Display the menu item if no profiles are specified
    }
  
    const assignedProfile = localStorage.getItem('profile');
  
    if (assignedProfile && profiles.includes(assignedProfile)) {
      return true; // Display the menu item if the assigned profile matches any allowed profiles
    }
  
    return false; // Hide the menu item if no match is found
  }

  