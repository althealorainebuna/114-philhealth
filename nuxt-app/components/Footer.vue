<template>
  <footer class="bg-gray-900 text-gray-300" role="contentinfo">
    <div class="container mx-auto px-4 py-12">
      <!-- Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/about"
                class="hover:text-primary-400 focus:outline-none focus:text-primary-400 focus:underline transition-colors"
              >
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/members"
                class="hover:text-primary-400 focus:outline-none focus:text-primary-400 focus:underline transition-colors"
              >
                Members
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/partners"
                class="hover:text-primary-400 focus:outline-none focus:text-primary-400 focus:underline transition-colors"
              >
                Partners
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/transparency"
                class="hover:text-primary-400 focus:outline-none focus:text-primary-400 focus:underline transition-colors"
              >
                Transparency
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-section">
          <h4 class="text-lg font-semibold text-white mb-4">Services</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/"
                class="hover:text-primary-400 focus:outline-none focus:text-primary-400 focus:underline transition-colors"
              >
                Member Portal
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/"
                class="hover:text-primary-400 focus:outline-none focus:text-primary-400 focus:underline transition-colors"
              >
                Group Enrollment
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/"
                class="hover:text-primary-400 focus:outline-none focus:text-primary-400 focus:underline transition-colors"
              >
                Claims Management
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/downloads"
                class="hover:text-primary-400 focus:outline-none focus:text-primary-400 focus:underline transition-colors"
              >
                Downloads
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-section">
          <h4 class="text-lg font-semibold text-white mb-4">Contact</h4>
          <div class="space-y-2">
            <p class="text-white">Philippine Health Insurance Corporation</p>
            <p>
              Email:
              <a
                href="mailto:info@philhealth.gov.ph"
                class="text-primary-400 hover:text-primary-300 focus:outline-none focus:underline transition-colors"
              >
                info@philhealth.gov.ph
              </a>
            </p>
            <p>
              Phone:
              <a
                href="tel:+6284417444"
                class="hover:text-primary-400 focus:outline-none focus:underline transition-colors"
              >
                (02) 8441-7444
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="border-t border-gray-700 pt-8 mb-6">
        <div class="text-sm space-y-4">
          <p>
            The PhilHealth Logo, Photographs and information on this Web Site
            may not be reproduced, copied, or downloaded in any form or by any
            means -- graphic, electronic, or mechanical, including recording,
            taping, photocopying, or information storage and retrieval systems
            -- for use in illegal, damaging or pornographic material.
          </p>
          <p>
            But PhilHealth information may be used for educational or
            informative purposes and may be reproduced, copied, or downloaded
            without the written permission from PhilHealth.
            <NuxtLink
              to="/disclaimer"
              class="text-primary-400 hover:text-primary-300 focus:outline-none focus:underline transition-colors ml-1"
            >
              Read full disclaimer
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-gray-700 pt-6 text-center">
        <p class="text-sm text-gray-400">
          &copy; {{ currentYear }} PHILIPPINE HEALTH INSURANCE CORPORATION
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
