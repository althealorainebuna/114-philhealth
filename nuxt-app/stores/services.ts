import { defineStore } from 'pinia'

export interface Service {
  id: string
  title: string
  description: string
  category: 'membership' | 'contribution' | 'collection' | 'accreditation' | 'benefits'
  icon: string
  iconColor: string
  difficulty: 'easy' | 'moderate' | 'complex'
  estimatedTime: string
  links: Array<{ label: string; url: string; external?: boolean }>
  tooltip?: {
    what: string[]
    need?: string
    who?: string
  }
}

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [
      // Membership
      {
        id: 'member-portal',
        title: 'Member Portal',
        description: 'Enables members to check on the accuracy of their membership details',
        category: 'membership',
        icon: 'inquiry',
        iconColor: 'orange',
        difficulty: 'easy',
        estimatedTime: '~5 min',
        links: [
          { label: 'Register/Login', url: '/login' }
        ],
        tooltip: {
          what: [
            'Check your membership status',
            'Verify personal information',
            'View contribution history'
          ],
          need: 'PhilHealth number and registered email'
        }
      },
      {
        id: 'egroup',
        title: 'Electronic Group Enrollment System',
        description: 'Facilitates registration and billing of Organized Groups.',
        category: 'membership',
        icon: 'egroup',
        iconColor: 'green',
        difficulty: 'moderate',
        estimatedTime: '~10-15 min',
        links: [
          { label: 'Login', url: '#', external: true }
        ],
        tooltip: {
          what: [
            'Register groups (companies, organizations)',
            'Manage member enrollment',
            'Process billing transactions'
          ],
          need: 'Employer/organization credentials'
        }
      },
      // Contribution
      {
        id: 'eprs',
        title: 'Electronic Premium Remittance System',
        description: 'Enables employers to remit their premium contributions online',
        category: 'contribution',
        icon: 'eprs',
        iconColor: 'teal',
        difficulty: 'moderate',
        estimatedTime: '~15 min',
        links: [
          { label: 'Login', url: '#', external: true },
          { label: 'ePOAF', url: '#', external: true }
        ],
        tooltip: {
          what: [
            'Submit premium contributions online',
            'Generate payment reports',
            'Track payment history'
          ],
          need: 'Employer account, PRN (Payment Reference Number)'
        }
      },
      // Collection
      {
        id: 'ecrs',
        title: 'Electronic Collection Reporting System',
        description: 'Enables PhilHealth Accredited Collecting Agents to submit daily RF2 reports online',
        category: 'collection',
        icon: 'ecrs',
        iconColor: 'green-dark',
        difficulty: 'moderate',
        estimatedTime: '~10 min',
        links: [
          { label: 'Login', url: '#', external: true }
        ],
        tooltip: {
          what: [
            'Submit daily collection reports (RF2 forms)',
            'Track submitted reports',
            'Generate collection summaries'
          ],
          who: 'PhilHealth Accredited Collecting Agents only'
        }
      },
      // Accreditation
      {
        id: 'health-facilities',
        title: 'Health Facilities',
        description: 'Shows the complete list of HCIs including accreditation status',
        category: 'accreditation',
        icon: 'hf',
        iconColor: 'blue',
        difficulty: 'easy',
        estimatedTime: '~3 min',
        links: [
          { label: 'Login', url: '#', external: true },
          { label: 'How to Register', url: '#', external: true }
        ],
        tooltip: {
          what: [
            'Search accredited health facilities',
            'Check facility accreditation status',
            'View facility information',
            'Apply for facility accreditation'
          ]
        }
      },
      {
        id: 'health-professionals',
        title: 'Health Care Professionals',
        description: 'Enables the health care professional to check their accreditation and claims status, and generate electronic accreditation ID',
        category: 'accreditation',
        icon: 'hcprof',
        iconColor: 'blue-light',
        difficulty: 'easy',
        estimatedTime: '~5 min',
        links: [
          { label: 'Register/Login', url: '#', external: true }
        ],
        tooltip: {
          what: [
            'Check your accreditation status',
            'View claims history',
            'Generate electronic accreditation ID',
            'Update professional information'
          ],
          who: 'Licensed health care professionals (doctors, nurses, etc.)'
        }
      },
      // Benefits
      {
        id: 'case-rates',
        title: 'Case Rates Search',
        description: 'Provides members with information on PhilHealth\'s benefit packages',
        category: 'benefits',
        icon: 'crs',
        iconColor: 'blue-medium',
        difficulty: 'easy',
        estimatedTime: '~2 min',
        links: [
          { label: 'Begin Search', url: '#', external: true }
        ],
        tooltip: {
          what: [
            'Search benefit packages by medical condition',
            'View coverage amounts',
            'Check eligibility requirements'
          ]
        }
      },
      {
        id: 'claims-eligibility',
        title: 'Claims Eligibility Checking',
        description: 'Enables providers to ascertain the benefit availment eligibility of members',
        category: 'benefits',
        icon: 'cec',
        iconColor: 'blue-light',
        difficulty: 'easy',
        estimatedTime: '~3 min',
        links: [
          { label: 'Login', url: '#', external: true }
        ],
        tooltip: {
          what: [
            'Verify member eligibility for benefits',
            'Check contribution compliance',
            'View member coverage status'
          ],
          who: 'PhilHealth accredited providers only'
        }
      }
    ] as Service[],
    searchQuery: '',
    selectedCategory: null as Service['category'] | null
  }),

  getters: {
    filteredServices: (state): Service[] => {
      let result = state.services

      // Filter by category
      if (state.selectedCategory) {
        result = result.filter(s => s.category === state.selectedCategory)
      }

      // Filter by search query
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        result = result.filter(s => 
          s.title.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query)
        )
      }

      return result
    },

    servicesByCategory: (state) => {
      return (category: Service['category']) => 
        state.services.filter(s => s.category === category)
    },

    categories: () => [
      { id: 'membership', label: 'Membership' },
      { id: 'contribution', label: 'Contribution' },
      { id: 'collection', label: 'Collection' },
      { id: 'accreditation', label: 'Accreditation' },
      { id: 'benefits', label: 'Benefits' }
    ]
  },

  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    setSelectedCategory(category: Service['category'] | null) {
      this.selectedCategory = category
    },

    clearFilters() {
      this.searchQuery = ''
      this.selectedCategory = null
    }
  }
})
