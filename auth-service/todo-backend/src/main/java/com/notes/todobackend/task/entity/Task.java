@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "list_id")
    private ListEntity list; // nullable => Inbox

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    private boolean isCompleted = false;
    private boolean isImportant = false;
    private Instant dueAt;
    private LocalDate myDayDate;
    private short priority = 0;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
    // getters/setters, @PreUpdate to set updatedAt
}
