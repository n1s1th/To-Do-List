@Entity
@Table(name = "lists")
public class ListEntity {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String name;

    private Instant createdAt = Instant.now();
    // getters/setters
}
