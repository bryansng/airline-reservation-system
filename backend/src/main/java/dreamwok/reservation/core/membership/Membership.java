package dreamwok.reservation.core.membership;

public enum Membership {
    GUEST("GUEST"), EXECUTIVE_CLUB("EXECUTIVE_CLUB");

    private final String text;

    Membership(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
