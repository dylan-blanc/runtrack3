/**
 * Calendar initialization script
 * Loaded dynamically when the calendar view is displayed
 */
function initCalendar() {
    const select = $('#selectCountries');
    const selectSubdivision = $('#selectSubdivision');
    select.on('change', function () {
        selectSubdivision.empty();
        $.bsCalendar.utils.openHolidayApi.getSubdivisions($(this).val(), 'DE').then(subdivisions => {
            subdivisions.forEach(subdivision => {
                selectSubdivision.append(`<option value="${subdivision.shortName}">${subdivision.name[0].text}</option>`)
            })
        });
    });

    $.bsCalendar.utils.openHolidayApi.getCountries('DE').then(countries => {
        countries.forEach(country => {
            select.append(`<option value="${country.isoCode}">${country.name[0].text}</option>`)
        })
        select.val('DE');
        select.trigger('change')
    });


    $.bsCalendar.setDefaults({
        title: '<span class="h4 text-uppercase mb-0">$.fn.bsCalendar</span>',
        locale: 'de-DE',
        startWeekOnSunday: false,
        navigateOnWheel: false,
        hourSlots: {
            start: 0,
            end: 24,
            height: 60
        },
        calendars: [
            {
                id: 'example-calendar-1',
                title: 'Personal',
                color: 'primary',
                active: true
            },
            {
                id: 'example-calendar-2',
                title: 'Work',
                color: 'danger',
                active: false
            },
            {
                id: 'example-calendar-3',
                title: 'Sports',
                color: 'success',
                active: true
            }
        ],
        url: url,
        debug: true,
        storeState: true,
        onAll(eventName, ...args) {
            console.log(eventName, ...args);
        }
    });
    const modal = $('#exampleModal');
    const calendarElement = $('#calendar');
    calendarElement.bsCalendar();

    calendarElement
        .on('change', '#selectUser', function () {
            const val = $(this).val();
            calendarElement.bsCalendar('refresh', {
                view: 'week',
                queryParams(p) {
                    if (val === 'all')
                        p.userId = null;
                    else
                        p.userId = val;
                    return p;
                }
            });
        })
        .on('add.bs.calendar', function (event, data) {
            modal.find('input[name="title"]').val(null);
            modal.find('input[name="from_date"]').val(data.start.date);
            modal.find('input[name="to_date"]').val(data.end.date);
            modal.find('input[name="from_time"]').val(data.start.time);
            modal.find('input[name="to_time"]').val(data.end.time);
            modal.find('input[name="allDay"]').prop('checked', false).trigger('change');
            modal.find('textarea[name="description"]').val(null);
            modal.find('input[name="color"]').val(null);
            modal.find('input[name="link"]').val(null);
            modal.modal('show');
        })
        .on('edit.bs.calendar', function (event, appointment, extras) {
            event.preventDefault();

            const isAllDay = appointment.allDay;
            const title = appointment.title;
            const description = appointment.description;
            const color = appointment.color;
            const link = appointment.link;

            const fromTime = isAllDay ? null : extras.start.time.substring(0, 5);
            const toTime = isAllDay ? null : extras.end.time.substring(0, 5);

            modal.find('input[name="title"]').val(title);
            modal.find('input[name="from_date"]').val(extras.start.date);
            modal.find('input[name="to_date"]').val(extras.end.date);
            modal.find('input[name="from_time"]').val(fromTime);
            modal.find('input[name="to_time"]').val(toTime);
            modal.find('input[name="allDay"]').prop('checked', isAllDay).trigger('change');
            modal.find('textarea[name="description"]').val(description);
            modal.find('input[name="color"]').val(color);
            modal.find('input[name="link"]').val(link);
            modal.modal('show');
        })
        .on('view.bs.calendar', function (event, view) {
            // console.log(view);
        })
        .on('click', '[data-method]', function (event) {
            event.preventDefault();
            switch ($(this).data('method')) {
                case 'destroy':
                    calendarElement.bsCalendar('destroy');
                    break;
                case 'clear':
                    calendarElement.bsCalendar('clear');
                    break;
                case 'refresh':
                    calendarElement.bsCalendar('refresh');
                    break;
                case 'setDate':
                    calendarElement.bsCalendar('setDate', { date: '1970-01-01', view: 'day' });
                    break;
                case 'setToday':
                    calendarElement.bsCalendar('setToday', 'week');
                    break;
                case 'updateOptions':
                    calendarElement.bsCalendar('updateOptions', {
                        locale: 'fr-FR',
                    });
                    break;
                default:
                    break;
            }
        })
        .on('change', '#selectSubdivision', function () {
            calendarElement.bsCalendar('updateOptions', {
                holidays: {
                    federalState: selectSubdivision.val(),
                    country: select.val()
                }
            });
        })

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Generates up to 500 day-buckets across the given year, summing counts per date
    function generateDates(year) {
        const entriesCount = Math.floor(Math.random() * 365) + 1;
        const buckets = new Map();

        for (let i = 0; i < entriesCount; i++) {
            const randomDate = new Date(
                year,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
            );

            const key = randomDate.toISOString().split('T')[0];
            const prev = buckets.get(key) || 0;
            const increment = Math.floor(Math.random() * 7);
            buckets.set(key, prev + increment);
        }

        return Array.from(buckets, ([date, total]) => ({ date, total }));
    }

    async function url(query) {
        await sleep(Math.floor(Math.random()));

        return new Promise((resolve, reject) => {
            try {
                const fromDate = query.fromDate ? new Date(`${query.fromDate}T00:00:00`) : null;
                const toDate = query.toDate ? new Date(`${query.toDate}T23:59:59`) : null;
                const search = query.search;

                if (search && !fromDate && !toDate) {
                    const limit = query.limit;
                    const offset = query.offset;
                    return resolve(getAppointmentsBySearch(search, limit, offset));
                }

                if (query.view === 'year') {
                    return resolve(generateDates(query.year));
                }

                const appointments = generateRandomAppointments(
                    (fromDate || new Date('1970-01-01T00:00:00')).toISOString(),
                    (toDate || new Date('9999-12-31T23:59:59')).toISOString(),
                    query.view
                );

                const filteredAppointments = appointments.filter(appointment => {
                    const appointmentStart = new Date(appointment.start);
                    const appointmentEnd = new Date(appointment.end);

                    return (
                        (!fromDate || appointmentStart >= fromDate) &&
                        (!toDate || appointmentEnd <= toDate)
                    );
                });

                if (search) {
                    const searchFilteredAppointments = filteredAppointments.filter(appointment => {
                        return appointment.title.toLowerCase().includes(search.toLowerCase());
                    });
                    return resolve(searchFilteredAppointments);
                }

                resolve(filteredAppointments);
            } catch (error) {
                reject(error);
            }
        });
    }

    function getAppointmentsBySearch(search, limit, offset) {
        if (!search) {
            return { rows: [], total: 0 };
        }

        const appointments = generateStaticAppointmentsForSearch();
        const filteredAppointments = appointments.filter(appointment =>
            appointment.title.toLowerCase().includes(search.toLowerCase())
        );

        const total = filteredAppointments.length;
        const startIndex = offset || 0;
        const endIndex = limit ? startIndex + limit : total;
        const rows = filteredAppointments.slice(startIndex, endIndex);

        return { rows, total };
    }

    function generateStaticAppointmentsForSearch() {
        const staticAppointments = [];
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6'];
        const links = ['https://example.com/event', 'https://example.com/details'];

        for (let i = 0; i < 46; i++) {
            const description = `Description for Appointment ${i + 1}`;
            const randomMonth = Math.floor(Math.random() * 12);
            const randomYear = Math.floor(Math.random() * (2025 - 2022 + 1)) + 2022;

            const randomTimeStart = new Date(randomYear, randomMonth, Math.floor(Math.random() * 27) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
            const randomTimeEnd = new Date(randomTimeStart);
            randomTimeEnd.setHours(randomTimeEnd.getHours() + 2);

            const color = colors[i % colors.length];
            const link = links[i % links.length];

            const appointment = {
                id: i + 1,
                title: `Appointment ${i + 1}`,
                description: description,
                start: randomTimeStart.toISOString().replace('T', ' ').substring(0, 19),
                end: randomTimeEnd.toISOString().replace('T', ' ').substring(0, 19),
                allDay: i % 21 === 0,
                color: color,
                link: link
            };

            staticAppointments.push(appointment);
        }

        return staticAppointments;
    }

    function generateRandomAppointments(start, end, view = null) {
        const colors = [
            'primary opacity-75 gradient', 'danger opacity-75 gradient', 'info gradient  opacity-75', 'warning gradient  opacity-75',
            'secondary opacity-75 gradient', 'dark opacity-75 gradient', 'light gradient  opacity-75', 'success gradient  opacity-75',
        ];

        const appointments = [];
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error("Ungültiges Start- oder Enddatum übergeben.");
        }

        if (endDate <= startDate) {
            throw new Error("Das Enddatum muss nach dem Startdatum liegen.");
        }

        let count;
        switch (view) {
            case 'month':
            case 'week':
            case 'day':
                count = Math.floor(Math.random() * 21);
                break;
            case 'year':
                count = Math.floor(Math.random() * 200);
                break;
            default:
                count = Math.floor(Math.random() * 120);
        }

        for (let i = 0; i < count; i++) {
            const startMinutesOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
            const randomStartTime = new Date(
                startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
            );

            randomStartTime.setMinutes(
                startMinutesOptions[Math.floor(Math.random() * startMinutesOptions.length)]
            );
            randomStartTime.setSeconds(0);
            randomStartTime.setMilliseconds(0);

            const durationOptions = [45, 60, 90, 120, 240, 500];
            const randomDuration = durationOptions[Math.floor(Math.random() * durationOptions.length)];

            const randomEndTime = new Date(randomStartTime.getTime() + randomDuration * 60000);

            if (randomEndTime > endDate) {
                continue;
            }

            const description = `This is a randomly generated appointment description. The appointment is meant to provide useful information about the scheduled event. Details such as the purpose of the appointment, participants, or special instructions can typically be included here. Appointment #${i + 1} is designed to showcase how descriptions enhance context.`;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const link = 'https://github.com/ThomasDev-de/bs-calendar';

            let location;
            const randomChoice = Math.floor(Math.random() * 3);
            if (randomChoice === 0) {
                location = `Location ${Math.floor(Math.random() * 100) + 1}`;
            } else if (randomChoice === 1) {
                location = [
                    `Room ${Math.floor(Math.random() * 10) + 1}`,
                    `Building ${Math.floor(Math.random() * 5) + 1}`
                ];
            } else {
                location = null;
            }

            const allDay = i % 21 === 0;
            const appointment = {
                id: i + 1,
                title: `Appointment ${i + 1}`,
                description: description,
                start: randomStartTime.toISOString().replace('T', ' ').substring(0, 19),
                end: randomEndTime.toISOString().replace('T', ' ').substring(0, 19),
                allDay: allDay,
                color: color,
                link: link,
                location: location
            };

            appointments.push(appointment);
        }

        return appointments;
    }


    $('#flexSwitchCheckDefaultAllDay').prop('checked', false)
        .on('change', function () {
            const isAllDay = $(this).prop('checked');
            $('.js-hide-on-all-day').toggle(!isAllDay);
        });

    $('#flexSwitchCheckTheme').prop('checked', false)
        .on('change', function () {
            const htmlElement = $('html');
            const theme = htmlElement.attr('data-bs-theme') === 'light' ? 'dark' : 'light';
            htmlElement.attr('data-bs-theme', theme);
        });

    // ICS Calendar
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const today = `${y}${m}${d}`;

    const icsString = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Team Meeting
DTSTART:${today}T090000
DTEND:${today}T100000
DESCRIPTION:Discussing the Q4 roadmap and milestones.
LOCATION:Conference Room B
URL:https://meet.google.com/abc-defg-hij
CATEGORIES:Work,Internal
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:Lunch with Client
DTSTART:${today}T123000
DTEND:${today}T133000
DESCRIPTION:Discussing new contract terms.
LOCATION:Italian Restaurant 'Luigi'
CATEGORIES:Business,Lunch
END:VEVENT
BEGIN:VEVENT
SUMMARY:Project Review
DTSTART:${today}T140000
DTEND:${today}T153000
DESCRIPTION:Reviewing the latest deployment.
LOCATION:Office 305
ORGANIZER:CN=Project Lead:mailto:boss@example.com
ATTENDEE;CN=John Doe:mailto:john@example.com
UID:1234567890
END:VEVENT
BEGIN:VEVENT
SUMMARY:Daily Standup
DTSTART:${today}T160000
DTEND:${today}T163000
DESCRIPTION:Quick sync on daily tasks.
URL:https://zoom.us/j/987654321
CATEGORIES:Agile,Daily
END:VEVENT
END:VCALENDAR`;

    const appointments = $.bsCalendar.utils.convertIcsToAppointments(icsString);

    $('#calendarICS').bsCalendar({
        url: () => Promise.resolve(appointments)
    });
}
