// SPA Router for seamless page transitions
class Router {
  constructor() {
    this.routes = {
      '/': { page: 'ecommerce', file: 'index.html' },
      '/index.html': { page: 'ecommerce', file: 'index.html' },
      '/employees.html': { page: 'employees', file: 'employees.html' },
      '/onboarding.html': { page: 'onboarding', file: 'onboarding.html' },
      '/user-profile.html': { page: 'userProfile', file: 'user-profile.html' },
      '/requests.html': { page: 'requests', file: 'requests.html' },
      '/overtime.html': { page: 'overtime', file: 'overtime.html' },
      '/payroll-concern-resolution.html': { page: 'payrollConcern', file: 'payroll-concern-resolution.html' },
      '/offboarding.html': { page: 'offboarding', file: 'offboarding.html' },
      '/candidate-portal.html': { page: 'candidatePortal', file: 'candidate-portal.html' },
      '/job-requisitions.html': { page: 'jobRequisitions', file: 'job-requisitions.html' },
      '/talent-pipeline.html': { page: 'talentPipeline', file: 'talent-pipeline.html' },
      '/interview-scheduling.html': { page: 'interviewScheduling', file: 'interview-scheduling.html' },
      '/hiring-metrics.html': { page: 'hiringMetrics', file: 'hiring-metrics.html' },
      '/clients.html': { page: 'clients', file: 'clients.html' },
      '/performance-bi.html': { page: 'performanceBI', file: 'performance-bi.html' },
      '/calendar.html': { page: 'calendar', file: 'calendar.html' },
      '/wfm-scheduling.html': { page: 'wfmScheduling', file: 'wfm-scheduling.html' },
      '/dtr.html': { page: 'dtr', file: 'dtr.html' },
      '/performance.html': { page: 'performance', file: 'performance.html' },
      '/scorecard.html': { page: 'scorecard', file: 'scorecard.html' },
      '/shrinkage-analysis.html': { page: 'shrinkage', file: 'shrinkage-analysis.html' },
      '/risk-dashboard.html': { page: 'riskDashboard', file: 'risk-dashboard.html' },
      '/risk-administration.html': { page: 'riskAdministration', file: 'risk-administration.html' },
      '/line-chart.html': { page: 'lineChart', file: 'line-chart.html' },
      '/bar-chart.html': { page: 'barChart', file: 'bar-chart.html' },
      '/alerts.html': { page: 'alerts', file: 'alerts.html' },
      '/avatars.html': { page: 'avatars', file: 'avatars.html' },
      '/badge.html': { page: 'badge', file: 'badge.html' },
      '/buttons.html': { page: 'buttons', file: 'buttons.html' },
      '/images.html': { page: 'images', file: 'images.html' },
      '/videos.html': { page: 'videos', file: 'videos.html' },
      '/signin.html': { page: 'signin', file: 'signin.html' },
      '/signup.html': { page: 'signup', file: 'signup.html' },
      '/profile.html': { page: 'profile', file: 'profile.html' },
      '/form-elements.html': { page: 'formElements', file: 'form-elements.html' },
      '/basic-tables.html': { page: 'basicTables', file: 'basic-tables.html' }
    };

    this.contentCache = {};
    this.init();
  }

  init() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.path) {
        this.loadPage(e.state.path, false);
      }
    });

    // Intercept all internal link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // Normalize the path
      let path = href;
      if (!path.startsWith('/')) {
        path = '/' + path;
      }

      // Check if it's one of our routes
      if (this.routes[path]) {
        e.preventDefault();
        e.stopPropagation();
        this.navigate(path);
        return false;
      }
    }, true); // Use capture phase to catch events early

    // Set initial state
    const currentPath = window.location.pathname === '/' || window.location.pathname.endsWith('/')
      ? '/index.html'
      : window.location.pathname.replace(/.*\//, '/');

    if (!window.history.state) {
      window.history.replaceState({ path: currentPath }, '', currentPath);
    }
  }

  navigate(path) {
    // Update browser history
    window.history.pushState({ path }, '', path);
    this.loadPage(path, true);
  }

  async loadPage(path, addToHistory = true) {
    const route = this.routes[path];
    if (!route) {
      console.error('Route not found:', path);
      return;
    }

    try {
      // Show loading state
      const mainContent = document.querySelector('main');
      if (!mainContent) return;

      // Fade out current content
      mainContent.style.opacity = '0';
      mainContent.style.transition = 'opacity 0.2s ease-in-out';

      await new Promise(resolve => setTimeout(resolve, 200));

      // Fetch the page content if not cached
      if (!this.contentCache[path]) {
        const response = await fetch(route.file);
        const html = await response.text();

        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract the main content
        const newMain = doc.querySelector('main');
        if (newMain) {
          this.contentCache[path] = newMain.innerHTML;
        }
      }

      // Update the main content
      if (this.contentCache[path]) {
        mainContent.innerHTML = this.contentCache[path];
      }

      // Update Alpine.js page state
      if (window.Alpine && window.Alpine.store) {
        const bodyData = Alpine.$data(document.body);
        if (bodyData) {
          bodyData.page = route.page;
        }
      }

      // Re-initialize any charts or components for the new page
      this.reinitializeComponents(route.page);

      // Fade in new content
      await new Promise(resolve => setTimeout(resolve, 50));
      mainContent.style.opacity = '1';

      // Scroll to top
      const contentArea = document.querySelector('.overflow-y-auto');
      if (contentArea) {
        contentArea.scrollTo(0, 0);
      }

    } catch (error) {
      console.error('Error loading page:', error);
    }
  }

  reinitializeComponents(page) {
    // Re-initialize Alpine components
    if (window.Alpine) {
      // Trigger Alpine to process new DOM elements
      const mainContent = document.querySelector('main');
      if (mainContent) {
        window.Alpine.initTree(mainContent);
      }
    }

    // Re-initialize charts based on page
    if (page === 'ecommerce') {
      // Only initialize charts if they exist in the DOM
      const hasChart01 = document.querySelector('#chartOne');
      const hasChart02 = document.querySelector('#chartTwo');
      const hasChart03 = document.querySelector('#chartThree');

      if (hasChart01 && window.chart01) {
        setTimeout(() => window.chart01(), 100);
      }
      if (hasChart02 && window.chart02) {
        setTimeout(() => window.chart02(), 100);
      }
      if (hasChart03 && window.chart03) {
        setTimeout(() => window.chart03(), 100);
      }
    }

    // Re-initialize risk dashboard charts
    if (page === 'riskDashboard') {
      const hasRiskCharts = document.querySelector('#riskLevelChart');
      if (hasRiskCharts && window.initRiskDashboardCharts) {
        setTimeout(() => window.initRiskDashboardCharts(), 200);
      }
    }
  }
}

// Initialize router when DOM is loaded
let router;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    router = new Router();
  });
} else {
  router = new Router();
}

export default Router;
